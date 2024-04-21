// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20 {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract GlobalPayment{
    address private immutable deployer;
    address private immutable cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    
    struct GlobalPaymentLink {
        address creator;
        string link;
    }
    
    struct FixedPaymentLink {
        address creator;
        string link;
        uint256 amount;
        bool paid;  
    }
    
    struct PaymentTransaction {
        address from;
        uint256 amount;
    }
    
    mapping(string => GlobalPaymentLink) public globalPaymentLinks;
    mapping(string => FixedPaymentLink) public fixedPaymentLinks;
    
    event GlobalPaymentLinkCreated(string link, address creator);
    event FixedPaymentLinkCreated(string link, address creator, uint amount);
    event ContributionAdded(string link, address contributor, uint256 amount);
    
    constructor() {
        deployer = msg.sender;
    }
    
    modifier onlyDeployer() {
        require(msg.sender == deployer, "Only deployer can call this function");
        _;
    }
    
    function createGlobalPaymentLink(string memory linkID) external {
        require(IERC20(cUsdTokenAddress).balanceOf(msg.sender) >= 2e18, "Insufficient Balance");
        // Transfer 2 cUSD to deployer as link generation fee
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, deployer, 2e18); // Assuming cUSD has 18 decimals

        globalPaymentLinks[linkID] = GlobalPaymentLink({
            creator: msg.sender,
            link: linkID
        });
                
        emit GlobalPaymentLinkCreated(linkID, msg.sender);
    }
    
    function contributeToGlobalPaymentLink(string memory linkID, uint256 _amount) external {
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, globalPaymentLinks[linkID].creator, _amount);

        emit ContributionAdded(linkID, msg.sender, _amount);
    }
    
    function createFixedPaymentLink(string memory linkID, uint256 _amount) external {
        require(IERC20(cUsdTokenAddress).balanceOf(msg.sender) >= _amount, "Insufficient Balance");
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, deployer, (_amount*10)/100); 

        fixedPaymentLinks[linkID] = FixedPaymentLink({
            creator: msg.sender,
            link: linkID,
            amount: _amount,
            paid: false
        });
        // Transfer 2 cUSD to deployer as link generation fee

        emit FixedPaymentLinkCreated(linkID, msg.sender, _amount);
    }
    
    function PayFixedPaymentLink(string memory linkID) external {
        require(!fixedPaymentLinks[linkID].paid, "Link already paid");
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, fixedPaymentLinks[linkID].creator, fixedPaymentLinks[linkID].amount);

        emit ContributionAdded(linkID, msg.sender, fixedPaymentLinks[linkID].amount);
    }
    
}


// Creation of Global payment link
// The following details must be required:
// - servie/purpose,creator, - date of creation, - link, - the transion hash

// ================when contributing to Global/Fixed pay=====
//  - creator, contributor's address, - the amount, transaction hash, date(timpestamp)


// Functions and params
// 1. createGlobalPaymentLink // Param: linkID
// 2. contributeToGlobalPaymentLink // Param: linkID, amount
// 3. createFixedPaymentLink // Param: linkID, amount
// 4. PayFixedPaymentLink // Param: linkID