import {NodeHandlerFn} from "@connectrpc/connect-node/dist/esm/node-universal-handler";
import {keccak_256} from "@noble/hashes/sha3";

export const signatureValidation= (next: NodeHandlerFn): NodeHandlerFn => (req, resp) => {
  const hasher = keccak_256.create();
  (req as any).hasher = hasher

  req.on("data", (chunk)=>{
    if (chunk instanceof Buffer) {
      hasher.update(chunk);
    }
  })

  next(req, resp);
}