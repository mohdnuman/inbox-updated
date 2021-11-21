// deploy code will go here
const HDWalletProvider=require('@truffle/hdwallet-provider');
const Web3=require('web3');
const {abi,evm}=require('./compile');

const provider=new HDWalletProvider(
    'book apple parade steak fox strike mountain rigid energy robot fee festival',
    'https://rinkeby.infura.io/v3/8ff4991998874528bf2db9c3c7db4293'
);

const web3=new Web3(provider);

const deploy=async()=>{       //we made deploy() so that we could use async await
    const accounts=await web3.eth.getAccounts();

    console.log("attempting to deploy from account",accounts[0]);

    const result=await new web3.eth.Contract(abi).deploy({ data:evm.bytecode.object,arguments:["Hello!"]})
    .send({from:accounts[0],gas:'1000000'})

    console.log("contract deployed to",result.options.address);

    provider.engine.stop();

}
deploy();