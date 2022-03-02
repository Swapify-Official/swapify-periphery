const SwapifyRouter = artifacts.require("SwapifyRouter.sol");
const WETH = artifacts.require("WETH9.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");

module.exports = async function(deployer, network, addresses) {
    let wethAddress, token1Address, token2Address;
    const FACTORY_ADDRESS = '0x9BC196b44CeCBd911dCba21cf19a27a7f36F7699';

    if(network == 'mainnet') {
        weth = '';
        token1Address = '';
        token2Address = '';

        await deployer.deploy(SwapifyRouter, FACTORY_ADDRESS, wethAddress);
        const router = await SwapifyRouter.deployed();

        await router.addLiquidity(token1Address, token2Address, web3.utils.toBN('10000000000000000000'), web3.utils.toBN('40000000000000000000'), 0, 0, addresses[0], web3.utils.toBN(1742680400));
    } else {
        await deployer.deploy(WETH);
        const weth = await WETH.deployed();
        wethAddress = weth.address;
        await deployer.deploy(Token1);
        await deployer.deploy(Token2);
        const token1 = await Token1.deployed();
        const token2 = await Token2.deployed();
        token1Address = token1.address;
        token2Address = token2.address;

        await deployer.deploy(SwapifyRouter, FACTORY_ADDRESS, wethAddress);
        const router = await SwapifyRouter.deployed();
        
        await token1.mint(addresses[0], web3.utils.toBN('10000000000000000000'));
        await token2.mint(addresses[0], web3.utils.toBN('40000000000000000000'));

        await token1.approve(router.address, web3.utils.toBN('10000000000000000000'));
        await token2.approve(router.address, web3.utils.toBN('40000000000000000000'));

        //await router.addLiquidity(token1Address, token2Address, web3.utils.toBN('10000000000000000000'), web3.utils.toBN('40000000000000000000'), 0, 0, addresses[0], web3.utils.toBN(1742680400));
    }
    
};
