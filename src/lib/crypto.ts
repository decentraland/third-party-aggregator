import { ContractNetwork } from "../modules/thirdParty/types"

export function checkERC721orERC1155(contractAddress: string, network: ContractNetwork): Promise<boolean> {
    if (!isValid(contractAddress)) {
          return
        }
        setIsCheckingContract(true)
        setContractValidationError(undefined)
        console.log('Launching debounced function', contractAddress, network)
        const rpcProviderUrl = network === Network.MATIC ? 'https://rpc.decentraland.org/polygon' : 'https://rpc.decentraland.org/mainnet'
        console.log('RPC provider URL', rpcProviderUrl)
        const jsonRpcProvider = new providers.JsonRpcProvider(rpcProviderUrl)
        const erc165Contract = ERC165__factory.connect(contractAddress, jsonRpcProvider)
  
        const Erc721InterfaceId = '0x01ffc9a7'
        const Erc1155InterfaceId = '0xd9b67a26'
        try {
          const supportsInterfaces = await Promise.all([
            erc165Contract.supportsInterface(Erc721InterfaceId),
            erc165Contract.supportsInterface(Erc1155InterfaceId)
          ])
          console.log('Supports interface', supportsInterfaces)
          if (!supportsInterfaces.some(supportsInterface => supportsInterface)) {
            setContractValidationError(
              'The contract is not based on the ERC721 or the ERC1155 standard. Please, check if the network or the contract address is correct.'
            )
          }
        } catch (error) {
          setContractValidationError('There was an error checking the contract. Please try again later.')
          console.error(error)
        } finally {
          setIsCheckingContract(false)
        }