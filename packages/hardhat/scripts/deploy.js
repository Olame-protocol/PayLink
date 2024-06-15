// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const GlobalPayment = await hre.ethers.getContractFactory("GlobalPayment");
    const globalPayment = await GlobalPayment.deploy();

    await globalPayment.deployed();

    console.log(
        `GlobalPayment deployed to ${globalPayment.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// GlobalPayment deployed to 0x51A570E5E009D1b6BAd4891Cd8D0e28630140bA1
// PayLink: 0x06B4637C35f7AA7220b6242BfBe89F8560dD30F2