const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  arr.slice(i * size, i * size + size)
)

export const onCharacterSpawn = ({ content, game }) => {
  const cache = game.mapCache.cache

  const { layers, others, precision } = content

  game.player.sprite.setX(game.player.sprite.x + precision.x * 32)
  game.player.sprite.setY(game.player.sprite.y + precision.y * 32)

  others.forEach((other) => {
    game.otherPlayers[other.characterId] = game.physics.add.sprite(other.coords.x * 32, other.coords.y * 32, 'atlas', 'misa-front').setSize(32, 32).setOffset(0, 24)
  })

  for (let i = 0; i < layers.length; i++) {
    cache[i].push(...chunk(layers[i], 32))

    // Server side
    cache[i].forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile == 0) cache[i][rowIndex][tileIndex] = -1
      })
    })

    game.layers[i].putTilesAt(cache[i], 0, 0)
  }

  console.log(cache)
}

export const onCharacterMove = ({ content, layers, mapCache, player }) => {
  // Disabled
}