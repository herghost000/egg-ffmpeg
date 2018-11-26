import JSEncrypt from 'jsencrypt'
const jsencrypt = new JSEncrypt()

export function encrypt(str) {
  jsencrypt.setPublicKey(
    '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoRSxPqDLxsdbM9Q4D4sujWBKHCAEcMHD19fkRigMbVMROCrvuETSCBE9Yefz+bwu09Gt8gIM3uA78ZZpY1P0ugkrZUNtNLeXPSjDd4HCaSiQsP2dhUPkhLpO0yVh+HJT2ducfVJpTU+cTk39TQOpSEAyQoq0L7Zhqa2D/uTKo+wIDAQAB-----END PUBLIC KEY-----'
  )
  return jsencrypt.encrypt(str)
}
