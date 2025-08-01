import type * as http from "node:http";
import {keccak_256} from "@noble/hashes/sha3";
//import {NodeHandlerFn} from "@connectrpc/connect-node/dist/esm/node-universal-handler.js";
//import {NodeServerRequest, NodeServerResponse} from "@connectrpc/connect-node/dist/esm/node-universal-handler.js";

export type NodeHandlerFn = (request: http.IncomingMessage, response: http.ServerResponse) => void;

export const signatureValidation= (next: NodeHandlerFn): NodeHandlerFn => (req :any, resp:any) => {
  const hasher = keccak_256.create();
  (req as any).hasher = hasher

  req.on("data", (chunk : any)=>{
    if (chunk instanceof Buffer) {
      hasher.update(chunk);
    }
  })

  next(req, resp);
}