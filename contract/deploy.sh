#!/bin/sh

# build the contract
yarn build

# deploy the contract
near deploy --accountId dev-1689336253218-95717993882079 --wasmFile build/contract.wasm