import { ethers } from 'ethers'
import abi from '../resources/pouch-abi.json'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const getMintEvents = async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/')
  const latestBlock = await provider.getBlockNumber()
  const contract = new ethers.Contract('0xA46346bC9d110907b5ACE36B53263320baf1cD21', abi, provider)
  const filter = await contract.filters.Transfer('0x5E3ad85A888d8706bAA70E3077aC0CDC6Dc00937', null, null)
  const rewardTransferEvents = await contract.queryFilter(filter, latestBlock - 1000, 'latest')
  const result = rewardTransferEvents.map((event) => {
    return {
      txHash: event.transactionHash,
      amount: parseFloat(ethers.utils.formatUnits(event.data, 18)).toFixed(2),
    }
  })
  return result.reverse()
}

const PouchPage = () => {

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])

  useEffect(async () => {
    setLoading(true)
    const result = await getMintEvents()
    console.log(result)
    setResult(result)
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen grid bg-base-200" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header/>
      <main className="container max-w-lg mx-auto mt-12 px-4">
        <h1 className="text-2xl mb-2">Wool Pouch Open Record</h1>
        <span
          className="text-sm text-base-content text-opacity-70">If the page is empty, please refresh and try again.</span>
        <ul className="result-list mt-8">
          {loading && <li
            className="w-full h-16 bg-base-100 flex flex-row justify-between items-center border border-base-300 shadow mb-2 rounded-lg p-2 space-x-2">Loading...</li>}
          {
            result.map(({ txHash, amount }) => {
              return (
                <li
                  key={txHash}>
                  <a
                    className="w-full h-16 bg-base-100 flex flex-row justify-between items-center border border-base-300 shadow mb-2 rounded-lg p-2 space-x-2"
                    href={'https://bscscan.com/tx/' + txHash} target="_blank">
                    <span className="text-base-500 text-4xl">🎁</span>
                    <span>{amount} <span className="text-sm text-base-content text-opacity-70">WOOL</span></span>
                  </a>
                </li>
              )
            })
          }
        </ul>
        <span className="text-sm text-base-content text-opacity-70">For performance reasons, only the results of the last 1000 blocks are displayed</span>
      </main>
      <Footer/>
    </div>
  )
}

export default PouchPage
