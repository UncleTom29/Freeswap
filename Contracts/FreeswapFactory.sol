// SPDX-License-Identifier: MIT
pragma solidity =0.8.13;

import "./FreeswapPool.sol"; 

contract FreeswapFactory {
    address[] private tokens;
    mapping(address => address) public tokenToPool;
    mapping(address => address) public poolToToken;

    event PoolLaunched(address token, address pool);

    function launchPool(address _token) external {
        require(_token != address(0), "Zero address provided");

        FreeswapPool _newPool = new FreeswapPool(_token);
        tokens.push(_token);
        tokenToPool[_token] = address(_newPool);
        poolToToken[address(_newPool)] = _token;

        emit PoolLaunched(_token, address(_newPool));
    }

    function getTokens() external view returns (address[] memory) {
        return tokens;
    }
}
