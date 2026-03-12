# :warning: DEPRECATED

> **This repository has been deprecated.** All development has moved to the unified Provider SDK monorepo.
>
> **Please use [t-0-network/provider-sdk](https://github.com/t-0-network/provider-sdk) instead.**
>
> This repository is no longer maintained and will be archived.

---

## Usage instructions
Usage instruction can be found in [NodeJS SDK docs](https://t-0-network.github.io/docs/integration-guidance/sdk-integration/ts-sdk/)

## Development instructions
1. Prepare
    ```bash
    git clone git@github.com:t-0-network/provider-sdk-ts.git
    cd provider-sdk-ts
    npm i
    ```
2. Copy `.env.example` into `.env` and set PROVIDER_PRIVATE_KEY and NETWORK_PUBLIC_KEY variables
    ```dotenv
    PROVIDER_PRIVATE_KEY=0x....
    NETWORK_PUBLIC_KEY=0x....
    
    ```
