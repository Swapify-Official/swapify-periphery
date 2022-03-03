const SwapifyRouter = artifacts.require('SwapifyRouter.sol')
const WETH = artifacts.require('WETH9.sol')

module.exports = async function(deployer, network) {
  let wethAddress, token1Address, token2Address
  const FACTORY_ADDRESS = '0x869dD5A1De4D7C8bA1854985cB02c24da9490111'

  if (network == 'mainnet') {
    weth = ''
    token1Address = ''
    token2Address = ''

    await deployer.deploy(SwapifyRouter, FACTORY_ADDRESS, wethAddress)
    const router = await SwapifyRouter.deployed()

    await router.addLiquidity(
      token1Address,
      token2Address,
      web3.utils.toBN('10000000000000000000'),
      web3.utils.toBN('40000000000000000000'),
      0,
      0,
      addresses[0],
      web3.utils.toBN(1742680400)
    )
  } else {
    await deployer.deploy(WETH)
    const weth = await WETH.deployed()
    wethAddress = weth.address

    await deployer.deploy(SwapifyRouter, FACTORY_ADDRESS, wethAddress)
    const router = await SwapifyRouter.deployed()


  }
}
