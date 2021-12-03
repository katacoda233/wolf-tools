import { ethers } from 'ethers'
import abi from '../resources/abi.json'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

const getTokenData = async (tokenId) => {
  const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/')
  const contract = new ethers.Contract('0x1d293cad3476f064cB684A37Ede558f8C1114a7a', abi, provider)
  const tokenURI = await contract.tokenURI(tokenId)
  return JSON.parse(atob(tokenURI.split(',')[1]))
}

const TransferLog = ({ tokenId, toAddress, isStolen }) => {

  const [tokenData, setTokenData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const v = await getTokenData(tokenId)
    setTokenData(v)
    setLoading(false)
  }, [tokenId])

  if (loading) {
    return <li className="w-full h-16 flex flex-row border border-base-300 shadow mb-2 rounded-lg p-2 space-x-2 bg-base-100">Loading...</li>
  } else {
    return <li className={classNames('w-full h-16 flex flex-row items-center border border-base-300 shadow mb-2 rounded-lg p-2 space-x-2', {'bg-error': isStolen, 'text-neutral-content': isStolen, 'bg-base-100': !isStolen})}>
      <img
        src={tokenData.image}
        className="w-10 h-10"/>
      <div>
        <h2>{tokenData.name}</h2>
      </div>
      <div className="flex-1 flex justify-end">
        <span className="text-base-500 text-4xl">{isStolen ? '🐺' : ''}</span>
      </div>
    </li>
  }
}

export default TransferLog
