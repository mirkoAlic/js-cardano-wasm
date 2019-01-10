import RustModule from './RustModule';
import { newArray, newArray0, copyArray } from './utils/arrays';
import { apply } from './utils/functions';

export const PRIVATE_KEY_SIZE = 32;
export const PUBLIC_KEY_SIZE = 32;
export const ADDRESS_SIZE = 32;

export const privateKeyToPublicKey = (module, privateKey) => {

  if (privateKey.length !== PRIVATE_KEY_SIZE) { return false; }

  const bufprivateKey = newArray(module, privateKey);
  const bufpublicKey = newArray0(module, PUBLIC_KEY_SIZE);

  module.cardano_redeem_prv_to_pub(bufprivateKey, bufpublicKey);
  let publicKey = copyArray(module, bufpublicKey, PUBLIC_KEY_SIZE);

  module.dealloc(bufprivateKey);
  module.dealloc(bufpublicKey);

  return publicKey;
};

export const privateKeyToAddress = (module, privateKey) => {
  if (privateKey.length !== PRIVATE_KEY_SIZE) { return false; }

  const bufprivateKey = newArray(module, privateKey);
  const bufaddress = newArray0(module, ADDRESS_SIZE);

  module.cardano_redeem_prv_to_address(bufprivateKey, bufaddress);
  let address = copyArray(module, bufaddress, ADDRESS_SIZE);
  module.dealloc(bufprivateKey);
  module.dealloc(bufaddress);

  return address;
}

export const publicKeyToAddress = (module, publicKey) => {

  if (publicKey.length !== PUBLIC_KEY_SIZE) { return false; }

  const bufpublicKey = newArray(module, publicKey);
  const bufaddress = newArray0(module, ADDRESS_SIZE);

  module.cardano_redeem_pub_to_address(bufpublicKey, bufaddress);
  let address = copyArray(module, bufaddress, ADDRESS_SIZE);
  module.dealloc(bufpublicKey);
  module.dealloc(bufaddress);

  return address;
 
}

export default {
  privateKeyToPublicKey: apply(privateKeyToPublicKey, RustModule),
  privateKeyToAddress: apply(privateKeyToAddress, RustModule),
  publicKeyToAddress: apply(publicKeyToAddress, RustModule),
  PRIVATE_KEY_SIZE: PRIVATE_KEY_SIZE,
  PUBLIC_KEY_SIZE: PUBLIC_KEY_SIZE,
  ADDRESS_SIZE: ADDRESS_SIZE
};
