export default {
  roundToNearest(numToRound, numToRoundTo) {
    numToRoundTo = 1 / (numToRoundTo)
    return Math.round(numToRound * numToRoundTo) / numToRoundTo
  },
}
