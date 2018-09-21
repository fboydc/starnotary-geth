const ERC721Token = artifacts.require('ERC721Token');

contract('ERC721Token', accounts=>{
	var defaultAccount = accounts[0]
	var user1 = accounts[1]
	var user2 = accounts[2]
	var operator = accounts[3]

	beforeEach(async function(){
		this.contract = await ERC721Token.new({from: defaultAccount})
	})

	describe('can create a token', () => {
		let tokenId = 1
		let tx;

		beforeEach(async function() {
			tx = await this.contract.mint(tokenId, {from: user1})
		})

		if('ownerOf tokenId is user1', async function() {
			assert.equal(await this.contract.ownerOf(tokenId), user1)
		})

		if('balanceOf of user1 is increased by 1', async function(){
			let balance = await this.contract.balanceOf(user1);

			assert.equal(balance.toNumber(), 1)
		})


		if('emits the correct event during creation of a new token', async function() {
			assert.equals(tx.logs[0].event, 'Transfer')
		})



	})
})