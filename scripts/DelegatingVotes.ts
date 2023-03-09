import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

const ERC20VOTES_ADDRESS="0x18dF1C9a5c9A7A35c251818Eec22ccaf3905fe3D"

async function main() {
  
  // Provider is mumbai
  const provider = new ethers.providers.InfuraProvider(
      "maticmum",
      process.env.INFURA_API_KEY
  );
  //const provider = new ethers.providers.InfuraProvider(
  //    "goerli",
  //    process.env.INFURA_API_KEY
  //);

  console.log({ provider });
  const pkey = process.env.PRIVATE_KEY_ACCOUNT1;
  const wallet = new ethers.Wallet(`${pkey}`);
  const signer = wallet.connect(provider);
  // Signer2
  const pkey2 = process.env.PRIVATE_KEY_ACCOUNT2;
  const wallet2 = new ethers.Wallet(`${pkey2}`);
  const signer2 = wallet2.connect(provider);
  // signer3
  const pkey3 = process.env.PRIVATE_KEY_ACCOUNT3;
  const wallet3 = new ethers.Wallet(`${pkey3}`);
  const signer3 = wallet3.connect(provider);

  const contractERC20VotesFactory = await new MyToken__factory(signer);
  const contractERC20Votes = await contractERC20VotesFactory.attach(
    ERC20VOTES_ADDRESS
  );
  console.log(
    `attached contract address is ${contractERC20Votes.address}` 
  );

  // TEAM 3 Addresses
  //const addresses = [
  //  "0x0BF3CdafFAfAD2498Df897C5bB52D4855ceBa18e", // Team3 signer.address
  //  "0x934a406B7CAB0D8cB3aD201f0cdcA6a7855F43b0", // Davids signer1.address
  //  "0xD64258a33E7AC0294a9fdE8e4C9A76674bD33A23", // hackathon signer2.address
  //  "0xDDd93CEC5843f471Eb2b8B2886b2Be32555B5209", // Personal Interface remix
  //]

  // DELEGATING VOTING POWER

  console.log("DELEGATING VOTING POWER");

  //First account1 self delegates
  const delegateTx = await contractERC20Votes.connect(signer).delegate(signer.address);
  const delegateTxRecipt = await delegateTx.wait();
  console.log(
    `tokens delegated from ${signer.address} to ${signer.address} at block ${delegateTxRecipt.blockNumber}`
  );
  let votingPower = await contractERC20Votes.getVotes(signer.address);
  console.log(
    `wallet ${signer.address} has a voting power of ${votingPower}`
  );

  //First account2 delegates
  const delegateTx2 = await contractERC20Votes.connect(signer2).delegate(signer2.address);
  const delegateTx2Recipt = await delegateTx2.wait();
  console.log(
    `tokens delegated from ${signer2.address} to ${signer2.address} at block ${delegateTx2Recipt.blockNumber}`
  );
  let votingPower2 = await contractERC20Votes.getVotes(signer2.address);
  console.log(
    `wallet ${signer2.address} has a voting power of ${votingPower2}`
  );

  //First account3 delegates
  const delegateTx3 = await contractERC20Votes.connect(signer3).delegate(signer3.address);
  const delegateTx3Recipt = await delegateTx3.wait();
  console.log(
    `tokens delegated from ${signer3.address} to ${signer3.address} at block ${delegateTx3Recipt.blockNumber}`
  );
  let votingPower3 = await contractERC20Votes.getVotes(signer3.address);
  console.log(
    `wallet ${signer3.address} has a voting power of ${votingPower3}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
