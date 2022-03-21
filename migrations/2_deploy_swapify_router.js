const SwapifyRouter = artifacts.require('SwapifyRouter.sol')
const WETH = artifacts.require('WETH9.sol')
const Token1 = artifacts.require('Token1.sol')
const Token2 = artifacts.require('Token2.sol')

module.exports = async function(deployer, network) {
  const FACTORY_ADDRESS_MATIC = '0x869dD5A1De4D7C8bA1854985cB02c24da9490111'
  const WETH_ADDRESS_MATIC = '0xd632D8116d57b68acb82169DCEfE27e2fB52a8Ce'
  const FACTORY_ADDRESS_ROPSTEN = '0x6c92565b5eC16588A8b5929A118e7768b6072395'
  const LOTTERY_ADDRESS_ROPSTEN = '0x0Aa4dA9fC6bF148E346f3aD0448449f059068739'

  if (network == 'ropsten') {
    await deployer.deploy(WETH)
    await WETH.deployed()

    await deployer.deploy(Token1)
    await Token1.deployed()
    await deployer.deploy(Token2)
    await Token2.deployed()

    await deployer.deploy(SwapifyRouter, FACTORY_ADDRESS_ROPSTEN, WETH.address, LOTTERY_ADDRESS_ROPSTEN)
    await SwapifyRouter.deployed()
  }

  if (network == 'matic') {
    await deployer.deploy(WETH)
    /*
    const weth = await WETH.deployed()
    wethAddress = weth.address */

    await deployer.deploy(SwapifyRouter, FACTORY_ADDRESS_MATIC, WETH_ADDRESS_MATIC)
    await SwapifyRouter.deployed()
  }
}
