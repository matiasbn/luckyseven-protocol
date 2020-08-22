# Luckyseven

## Protocol
1. The user requests a random number using the API.
Includes the parameter `` seed ``, which is a random number.
2. The API issues an ERC-721 token with the envelope of ``seed`.
Then the smart contract issues the events 'request number 1' and 'request number 2'.
3. The oracle detects a 'request number 1' or a 'request number 2'
event and publishes 1 envelope for each event detected in the token contract.
4. Once both envelopes are published, the smart contract issues an event.
5. The Oracle and API can then revea the value of their envelopes in the smart contract.
6. Once everything is published and accepted by the smart contract, the oracle proceeds to calculate the
publicly verifiable random number value.
7. The oracle publishes the value in the smart contract.

## Todo
- [x] Ask for a random number. (API)
- [x] Store seedEnvelope and emit event.(Web3)
- [x] Catch event and publish testimonies.(Oracle)
- [ ] Create luckyseven PRNG library.(Library)
- [ ] Create WebApp for the MVP to ask for random number.(WebApp)

## Usage

### Prerequisites:
* Node.js >= v12.18.0

### Installation
```
npm install
```

### Dev
```
npm run dev
```

### Build
```
npm run build
```

### Start
```
npm run start
```
