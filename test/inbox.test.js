const assert=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');  //Web3 is a constructor function....we use this to craete web3 instances....the purpose of each instance to coneect to different ethereum networks.
const web3=new Web3(ganache.provider());
const {abi,evm}=require('../compile');

let accounts;
let inbox;

beforeEach(async()=>{
    accounts=await web3.eth.getAccounts();

    inbox=await new web3.eth.Contract(abi).deploy({ data:evm.bytecode.object,arguments:["Hi There!"]})
    .send({from:accounts[0],gas:'1000000'})
});

describe('Inbox',()=>{
    it('deploys contract',()=>{
        assert.ok(inbox.options.address);
    });

    it('has a initial message',async ()=>{
        const message=await inbox.methods.message().call();
        assert.equal(message,'Hi There!');
    });

    it('can chnage the message',async()=>{
        await inbox.methods.setMessage("bye").send({from:accounts[0]});
        const message=await inbox.methods.message().call();
        assert.equal(message,'bye');
    })
});
