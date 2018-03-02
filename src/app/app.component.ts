import { Component } from '@angular/core';
import Web3 from 'web3';

import Tx from 'ethereumjs-tx';
declare var Buffer;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  web3: any;
  abi: any;
  votingContract: any;
  contractInstance: any;
  rawTransaction: any;

  ngOnInit() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/UmuD6xrDaAPB72BcE13q"));
    // this.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));

    // this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"));
    this.abi = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]')
    this.votingContract = this.web3.eth.contract(this.abi);
    this.contractInstance = this.votingContract.at('0x59f5d9a2b1451c02aa18d3ed88d17d667d589de9');


  }


  voteForCandidate(candidate) {

    var firstMainadress = '0x3c7B83E0Fa6f19B1B61e80A73630cB5Db48b700C';
    var secondAdress = '0x38ebbB608fbb40fca07e0EcBAc89e20520BD33f1';
    let contract = this.votingContract;

    // this.contractInstance.transfer(secondAdress, 1000, {from : firstMainadress})


    var privateKey = new Buffer('abc4e7ed720eca3b96f34534c4a61eb66228e92968acf7affb048c795078eafa','hex')
    var data = this.contractInstance.transfer.getData(secondAdress, 1000, {from: firstMainadress});
    var nonce = this.web3.toHex(this.web3.eth.getTransactionCount(firstMainadress)); //this.web3.toHex(2024826);
    var gasPrice = this.web3.toHex(2000000000);
    var gasLimitHex = this.web3.toHex(51222);
    var rawTx = { 'nonce': nonce, 'gasPrice': gasPrice, 'gasLimit': gasLimitHex, 'from': firstMainadress, 'to': '0x59f5d9a2b1451c02aa18d3ed88d17d667d589de9', 'data': data}
    var tx = new Tx(rawTx);
    tx.sign(privateKey)
    var serializedTx = '0x'+tx.serialize().toString('hex')
    this.web3.eth.sendRawTransaction(serializedTx, function(err, txHash){
      console.log(err, txHash)
    })


  }

}
