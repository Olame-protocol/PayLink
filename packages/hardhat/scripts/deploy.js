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
// GlobalPayment deployed to 0x42C35cDcd2E7315a9C729B202aE5Fc4daBc82fDf