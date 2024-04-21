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
    
    function createGlobalPaymentLink(string memory _link) external {
        globalPaymentLinks[_link] = GlobalPaymentLink({
            creator: msg.sender,
            link: _link
        });
        
        emit GlobalPaymentLinkCreated(_link, msg.sender);
        
        // Transfer 2 cUSD to deployer as link generation fee
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, deployer, 2 * 10**18); // Assuming cUSD has 18 decimals
    }
    
    function contributeToGlobalPaymentLink(string memory _link, uint256 _amount) external {
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, globalPaymentLinks[_link].creator, _amount);

        emit ContributionAdded(_link, msg.sender, _amount);
    }
    
    function createFixedPaymentLink(string memory _link, uint256 _amount) external {
        
        fixedPaymentLinks[_link] = FixedPaymentLink({
            creator: msg.sender,
            link: _link,
            amount: _amount,
            paid: false
        });
        // Transfer 2 cUSD to deployer as link generation fee
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, deployer, 2 * 10**18); // Assuming cUSD has 18 decimals

        emit FixedPaymentLinkCreated(_link, msg.sender, _amount);
    }
    
    function PayFixedPaymentLink(string memory _link, uint256 _amount) external {
        require(!fixedPaymentLinks[_link].paid, "Link already paid");
        IERC20(cUsdTokenAddress).transferFrom(msg.sender, fixedPaymentLinks[_link].creator, _amount);

        emit ContributionAdded(_link, msg.sender, _amount);
    }
    
}
