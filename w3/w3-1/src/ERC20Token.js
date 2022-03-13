import './App.css';

import React from 'react';
import { ethers } from 'ethers'
import ERC20Token from './artifacts/contracts/ERC20Token.sol/ERC20Token.json'
import Vault from './artifacts/contracts/Vault.sol/Vault.json'


const ERC20TokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
const VaultAddress = "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44"


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tokenName: '',
      tokenSymbol: '', 
      decimals:0,
      tokenTotal: 0,
      increaseAmount:0,
      addressOnInputChange:'',
      transferAmountOnInputChange:'',
      balance:0,
      depositeValue:0,
      addressBalance:0,
      userAddress:''
    };
    this.onInputChange = this.onInputChange.bind(this);//手动绑定
    this.increaseAmount = this.increaseAmount.bind(this);//手动绑定
    this.addressOnInputChange = this.addressOnInputChange.bind(this);//手动绑定
    this.transferAmountOnInputChange = this.transferAmountOnInputChange.bind(this);//手动绑定
    this.transfer = this.transfer.bind(this);//手动绑定
    this.updateTokenTotal = this.updateTokenTotal.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.getConnect = this.getConnect.bind(this);
    this.getAddressBalance = this.getAddressBalance.bind(this);
    this.deposite = this.deposite.bind(this);
    this.depositeValueChange = this.depositeValueChange.bind(this)

  } 

  /**
   * 初始化token基本信息
   */
  async componentDidMount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ERC20TokenAddress, ERC20Token.abi, signer)
    try{
      const tokenN = await contract.name()
      this.setState({tokenName:tokenN})
      const tokenS =  await contract.symbol()
      console.log('tokenName:',tokenS)
      this.setState({tokenSymbol:tokenS})
      const decimals = await contract.decimals();
      this.setState({decimals:decimals})
      const tokenTotal =  await contract.totalSupply();
      this.setState({tokenTotal:ethers.utils.formatEther(tokenTotal._hex)})
    }catch (err) {
      console.log("Error: ", err)
    }
  }

  /**
   * token增发onchange事件捕获
   */
  onInputChange(e){
    const incre = e.target.value
    console.log("increaseAmount值为：",incre)
    this.setState({
      increaseAmount:incre
    })
  }

  /**
   * 输入地址的捕获
   */
  addressOnInputChange(e){
    const incre = e.target.value
    this.setState({
      addressOnInputChange:incre
    })
  }

  /**
   * 转账金额的捕获
   */
  transferAmountOnInputChange(e){
    const incre = e.target.value
    this.setState({
      transferAmountOnInputChange:incre
    })
  }

  /**
   * 增加金额
   */
  async  increaseAmount(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ERC20TokenAddress, ERC20Token.abi, signer)
    console.log("增加变量为：",this.state.increaseAmount)
    await contract.increaseBalance(this.state.increaseAmount)
  }

  /**
   * 转账
   */
  async  transfer(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ERC20TokenAddress, ERC20Token.abi, signer)
    await contract.transfer(this.state.addressOnInputChange,this.state.transferAmountOnInputChange)
  }

  /**
   * 更新token总量
   */
  async updateTokenTotal(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ERC20TokenAddress, ERC20Token.abi, signer)
    const tokenTotal =  await contract.totalSupply();
    this.setState({tokenTotal:ethers.utils.formatEther(tokenTotal._hex)})
  }

  /**
   * 获取余额
   */
  async getBalance(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ERC20TokenAddress, ERC20Token.abi, signer)
    const balance =  await contract.balanceOf(this.state.addressOnInputChange);
    this.setState({balance:ethers.utils.formatEther(balance)})
  }

  /**
   * 查询用户余额
   */
   async getAddressBalance(){
      debugger
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(Vault, Vault.abi, signer)
      const balance =  await contract.balanceOf(this.state.userAddress);
      this.setState({addressBalance:ethers.utils.formatEther(balance)})
   }
  
   /**
    * 连接钱包
    */
   async getConnect(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.setState({userAddress:account})
   }

   /**
    * 获取deposite值
    */
   depositeValueChange(e){
    const value = e.target.value
    this.setState({
      depositeValue:value
    })
   }

     /**
    * deposite
    */
    async deposite(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(ERC20TokenAddress, ERC20Token.abi, signer)
      const balance =  await contract.deposite(this.state.depositeValueChange);
    }

   /**
    * withdraw
    */
    async withdraw(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(ERC20TokenAddress, ERC20Token.abi, signer)
      const balance =  await contract.withdraw();
    }

  render() {
    return (
    <div className="App">
        <div className="Token">
            <h4>Token基本信息</h4>
            <p>Token名称：{this.state.tokenName}</p>
            <p>Token简称：{this.state.tokenSymbol}</p>
            <p>Token精度：{this.state.decimals}</p>
            <p>Token总量：{this.state.tokenTotal}</p>
            <button  onClick={this.updateTokenTotal}>更新Token总量</button>
            <div>
                <h4>Token增发</h4> 
                <p>增发值为：{this.state.increaseAmount}</p>
                <input type="text"  onChange={this.onInputChange} placeholder="Set increaseAmount"/>
                <button  onClick={this.increaseAmount}>token增发</button>
            </div>
            <div>
                <h4>Token转账</h4> 
                <p>接收地址为：{this.state.addressOnInputChange}</p>
                <input type="text"  onChange={this.addressOnInputChange} placeholder="Set address"/>
                <p>该地址余额为：{this.state.balance}</p>
                <button  onClick={this.getBalance}>查询地址余额</button>
                <p>转账数量为：{this.state.transferAmountOnInputChange}</p>
                <input type="text"  onChange={this.transferAmountOnInputChange} placeholder="Set amount"/><br/>
                <button  onClick={this.transfer}>地址转账</button>
            </div>
        </div>
        <p>___________________________________________________________________________________________________________________</p>
        <div className='Vault'>
          <h4>Deposite</h4> 
          <button  onClick={this.getConnect}>连接钱包</button>
          <p>用户地址：{this.state.userAddress}</p>
          <p>用户存款余额：{this.state.addressBalance}</p>
          <button  onClick={this.getAddressBalance}>查询用户余额</button>
          <p>deposite数量：{this.state.depositeValue}</p>
          <input type="text"  onChange={this.depositeValueChange} placeholder="Set deposite amount"/>
          <button  onClick={this.deposite}>deposite</button>
          <h4>withdraw</h4> 
          <button  onClick={this.withdraw}>withdraw</button>
        </div>
    </div>
    );
  }
}
export default Test