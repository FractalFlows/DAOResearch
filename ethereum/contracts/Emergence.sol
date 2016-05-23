//import "ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Emergence {
	// The keyword "public" makes those variables
	// readable from outside.
	address public minter;
	mapping (address => uint) public balances;
	uint public storedData;
	string url;

	function Emergence() {
		balances[tx.origin] = 10000;
		minter = msg.sender;
		storedData = 10;
	}

	function setURL(string x){
		url = x;
	}

	function getURL() constant returns (string theURL) {
		if (msg.value > 10) return url;
		else return "http://google.com";
	}

  function set(uint x) {
      storedData = x;
  }

	// I think constant means that the method won't change anything
  function get() constant returns (uint retVal) {
      return storedData;
  }

  // Events allow light clients to react on
  // changes efficiently.
  event Sent(address from, address to, uint amount);

  function mint(address receiver, uint amount) {
      if (msg.sender != minter) return;
      balances[receiver] += amount;
  }

  function send(address receiver, uint amount) {
			// Check that the account has enough balance
      if (balances[msg.sender] < amount) return;
      balances[msg.sender] -= amount;
      balances[receiver] += amount;
			// Notify the listeners
      Sent(msg.sender, receiver, amount);
  }
}
