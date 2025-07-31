# ZKPassport — Privacy-Preserving Credential Verification

A blockchain-based decentralized identity platform enabling users to prove verified credentials (like age, nationality, or education) without revealing any sensitive personal information, using Zero-Knowledge Proofs (ZKPs).

## Overview

This system consists of ten smart contracts written in Clarity that together create a secure, privacy-focused identity verification framework:

1. **Identity Registry Contract** – Registers user identities via DIDs
2. **ZK Verifier Contract** – Validates zero-knowledge proofs submitted by users
3. **Credential Issuer Registry Contract** – Manages a list of verified institutions
4. **Credential Minting Contract** – Issues soulbound credentials as NFTs
5. **ZK Proof Request Manager Contract** – Allows dApps to request specific proofs
6. **Revocation Registry Contract** – Handles credential revocation
7. **DAO Governance Contract** – Decentralized issuer and system governance
8. **Privacy Payment Escrow Contract** – Enables private, ZK-based payments
9. **Proof Staking Contract** – Slashes malicious issuers and incentivizes good behavior
10. **Access Control Contract** – Restricts access to services based on ZK-verified proofs

## Features

- Zero-Knowledge Proof integration for credential privacy
- Soulbound credential NFTs
- Verifiable credential issuance and revocation
- DID-based identity management
- DAO-managed trust system for issuers
- ZK-based private payment flows
- Privacy-preserving access control
- Modular contract design for easy customization

## Smart Contracts

### Identity Registry Contract

- DID creation and registration
- Identity binding to wallet address
- Off-chain credential hash storage

### ZK Verifier Contract

- On-chain verification of zk-SNARK/PLONK proofs
- Integration with trusted circuits
- Signal and nullifier validation for ZK integrity

### Credential Issuer Registry Contract

- Whitelisting of trusted institutions (universities, KYC firms, etc.)
- Permissioned issuer management
- DAO-approved listing and delisting

### Credential Minting Contract

- Soulbound NFTs representing issued credentials
- Credential metadata stored off-chain (IPFS)
- Minted only by whitelisted issuers

### ZK Proof Request Manager Contract

- Allows services to request specific credential proofs
- Defines verification parameters and expiration
- Stores on-chain record of request logs

### Revocation Registry Contract

- Enables credential invalidation
- Maintains revocation logs for auditability
- Accessible by issuer or governance contract

### DAO Governance Contract

- Proposal submission, voting, and execution logic
- Community-driven updates to issuer lists and parameters
- Smart contract upgrade pathway

### Privacy Payment Escrow Contract

- Supports ZK-based anonymous payments
- Optionally linked to proof submission workflows
- Uses nullifier tracking to prevent double-spending

### Proof Staking Contract

- Issuers stake to guarantee honest behavior
- Slashing if issuer-provided credentials are revoked
- Acts as collateral enforcement mechanism

### Access Control Contract

- Validates user access based on verified credentials
- Used by external dApps to gate services
- Stateless proof verification model

## Installation

1. Install Clarinet CLI
2. Clone this repository
3. Run tests: `npm test`
4. Deploy contracts: `clarinet deploy`

## Usage

Each contract can be deployed independently and interacts with others via defined interfaces. Developers can integrate ZKPassport into their dApps to enable privacy-first credential verification.

Refer to each contract's documentation for full API usage and logic flow.

## Testing

All contracts are tested using Vitest in a mock Clarity environment.

```bash
npm test
```

## License

MIT License