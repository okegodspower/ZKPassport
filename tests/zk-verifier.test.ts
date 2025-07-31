import { describe, it, expect, beforeEach } from "vitest"

const mockZKVerifier = {
  admin: "ST1ADMINADDRESS000000000000000000000000000",
  verifierRegistry: new Map<number, string>(),
  circuitRegistry: new Map<number, { hash: string; version: number }>(),
  verificationEvents: new Map<number, { sender: string; circuitId: number; timestamp: number }>(),
  counter: 0,

  isAdmin(caller: string) {
    return caller === this.admin
  },

  registerVerifier(caller: string, verifierId: number, contract: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (this.verifierRegistry.has(verifierId)) return { error: 101 }
    this.verifierRegistry.set(verifierId, contract)
    return { value: true }
  },

  registerCircuit(caller: string, circuitId: number, hash: string, version: number) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.circuitRegistry.set(circuitId, { hash, version })
    return { value: true }
  },

  getVerifier(verifierId: number) {
    const verifier = this.verifierRegistry.get(verifierId)
    if (!verifier) return { error: 102 }
    return { value: verifier }
  },

  getCircuit(circuitId: number) {
    const circuit = this.circuitRegistry.get(circuitId)
    if (!circuit) return { error: 104 }
    return { value: circuit }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.admin = newAdmin
    return { value: true }
  },

  submitProof(caller: string, circuitId: number, proofHash: string, blockHeight: number) {
    const circuit = this.circuitRegistry.get(circuitId)
    if (!circuit) return { error: 104 }
    if (circuit.hash !== proofHash) return { error: 105 }

    this.verificationEvents.set(this.counter, {
      sender: caller,
      circuitId,
      timestamp: blockHeight
    })
    this.counter++
    return { value: true }
  },

  verifyProof(circuitId: number, proofHash: string) {
    const circuit = this.circuitRegistry.get(circuitId)
    if (!circuit) return { error: 104 }
    return { value: circuit.hash === proofHash }
  }
}

describe("ZK Verifier Contract", () => {
  beforeEach(() => {
    mockZKVerifier.admin = "ST1ADMINADDRESS000000000000000000000000000"
    mockZKVerifier.verifierRegistry.clear()
    mockZKVerifier.circuitRegistry.clear()
    mockZKVerifier.verificationEvents.clear()
    mockZKVerifier.counter = 0
  })

  it("allows admin to register a verifier", () => {
    const res = mockZKVerifier.registerVerifier(
      mockZKVerifier.admin,
      1,
      "ST2VERIFIERCONTRACT00000000000000000000000"
    )
    expect(res).toEqual({ value: true })
  })

  it("prevents non-admin from registering a verifier", () => {
    const res = mockZKVerifier.registerVerifier(
      "ST3UNAUTHORIZED000000000000000000000000000",
      1,
      "ST2VERIFIERCONTRACT00000000000000000000000"
    )
    expect(res).toEqual({ error: 100 })
  })

  it("registers and verifies circuit", () => {
    mockZKVerifier.registerCircuit(mockZKVerifier.admin, 42, "abcd1234", 1)
    const res = mockZKVerifier.verifyProof(42, "abcd1234")
    expect(res).toEqual({ value: true })
  })

  it("rejects invalid proof hash", () => {
    mockZKVerifier.registerCircuit(mockZKVerifier.admin, 42, "abcd1234", 1)
    const res = mockZKVerifier.verifyProof(42, "wronghash")
    expect(res).toEqual({ value: false })
  })

  it("tracks successful proof submission", () => {
    mockZKVerifier.registerCircuit(mockZKVerifier.admin, 99, "proofhash99", 2)
    const res = mockZKVerifier.submitProof("ST1USER", 99, "proofhash99", 12345)
    expect(res).toEqual({ value: true })
    expect(mockZKVerifier.verificationEvents.get(0)?.circuitId).toBe(99)
  })

  it("transfers admin rights", () => {
    const newAdmin = "ST2NEWADMIN000000000000000000000000000"
    const res = mockZKVerifier.transferAdmin(mockZKVerifier.admin, newAdmin)
    expect(res).toEqual({ value: true })
    expect(mockZKVerifier.admin).toBe(newAdmin)
  })
})
