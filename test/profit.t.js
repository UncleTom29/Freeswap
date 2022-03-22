const TestToken = artifacts.require('TestToken');
const FreeswapFactory = artifacts.require('FreeswapFactory');
const FreeswapPool = artifacts.require('FreeswapPool');

contract('FreeswapPool', (accounts) => {
  let token = null;
  let factory = null;
  let pool = null;

  before(async () => {
    token = await TestToken.new('Test Token', 'TTK');
    token.mint(accounts[1], web3.utils.toWei('1', 'ether'));

    factory = await FreeswapFactory.deployed();
    await factory.launchPool(token.address);
    const poolAddr = await factory.tokenToPool(token.address);
    pool = await FreeswapPool.at(poolAddr);

    await token.approve(pool.address, web3.utils.toWei('1', 'ether'), { from: accounts[1] });
    await token.approve(pool.address, web3.utils.toWei('1', 'ether'), { from: accounts[2] });
  });

  it('should provide a profit', async () => {
    await pool.initializePool(1000000, { from: accounts[1], value: 1000000 });

    const initialWeiBalance = await web3.eth.getBalance(pool.address);

    await pool.ethToTokenSwitch(0, { from: accounts[2], value: 10000 });
    const tokenAmount = await token.balanceOf(accounts[2]);
    await pool.tokenToEthSwitch(tokenAmount, 0, { from: accounts[2] });

    const finalWeiBalance = await web3.eth.getBalance(pool.address);

    assert(finalWeiBalance - initialWeiBalance > 0, 'No extra wei in final balance');
  });
});
