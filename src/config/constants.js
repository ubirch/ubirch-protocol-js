// ubirch-protocol constants

export const UBIRCH_PROTOCOL_VERSION = 1

export const PLAIN = ((UBIRCH_PROTOCOL_VERSION << 4) | 0x01)
export const SIGNED = ((UBIRCH_PROTOCOL_VERSION << 4) | 0x02)
export const CHAINED = ((UBIRCH_PROTOCOL_VERSION << 4) | 0x03)

export const UBIRCH_PROTOCOL_TYPE_BIN = 0x00
export const UBIRCH_PROTOCOL_TYPE_REG = 0x01
export const UBIRCH_PROTOCOL_TYPE_HSK = 0x02
