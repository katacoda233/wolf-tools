import { ethers } from 'ethers'
import { useState } from 'react'
import abi from '../resources/abi.json'
import TransferLog from '../components/TransferLog'
import classNames from 'classnames'
import Header from '../components/Header'
import Footer from '../components/Footer'

const BARN_CONTRACT_ADDRESS = '0x176306230DD1B6628B1C1E4c06EC2eF864FF8ec4'

const getTransferEvents = async (txid) => {
  const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/')
  const txData = await provider.getTransaction(txid)
  const txBlockNum = txData.blockNumber

  const contract = new ethers.Contract('0x1d293cad3476f064cB684A37Ede558f8C1114a7a', abi, provider)
  const filter = await contract.filters.Transfer(null, null, null)
  const events = await contract.queryFilter(filter, txBlockNum, txBlockNum)

  const result = events.map((event) => {
    const toAddress = event.args[1]
    return {
      tokenId: event.args[2].toNumber(),
      toAddress: toAddress,
      isStolen: toAddress !== BARN_CONTRACT_ADDRESS && toAddress !== txData.from,
    }
  })
  console.log(result)

  return result
}

function MintPage () {

  const [txid, setTxid] = useState('')
  const [loading , setLoading] = useState(false)
  const [events, setEvents] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!txid) {
      return
    }
    setLoading(true)
    const logs = await getTransferEvents(txid)
    setEvents(logs)
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid bg-base-200" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      <main className="container max-w-lg mx-auto mt-12">
        <h1 className="text-2xl mb-2">Mint Detail</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Transaction ID</span>
            </label>
            <input
              type="text" placeholder="0xabcd..." className="input input-bordered"
              value={txid} onChange={(e) => setTxid(e.target.value)}
            />
          </div>
          <div className="form-control mt-8">
            <button
              onClick={handleSubmit}
              className={classNames('btn btn-primary btn-wide mx-auto', {loading})}>View Detail</button>
          </div>
        </form>
        <ul className="result-list mt-8">
          {events.map((record) => <TransferLog key={record.tokenId} {...record} />)}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default MintPage
