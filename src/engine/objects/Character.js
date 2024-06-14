const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  arr.slice(i * size, i * size + size)
)

export const onCharacterSpawn = ({ content, layers, mapCache, player }) => {
  // Adjust player position
  player.sprite.setX(player.sprite.x + content.precision.x * 32)
  player.sprite.setY(player.sprite.y + content.precision.y * 32)

  content.others.forEach((other) => {
    game.otherPlayers[other.characterId] = game.physics.add.sprite(other.coords.x * 32, other.coords.y * 32, 'atlas', 'misa-front').setSize(32, 32).setOffset(0, 24)
  })

  for (let i = 0; i < content.layers.length; i++) {
    mapCache[i].push(...chunk(content.layers[i], 32))

    // Server side
    mapCache[i].forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile == 0) mapCache[i][rowIndex][tileIndex] = -1
      })
    })

    layers[i].putTilesAt(mapCache[i], 0, 0)
  }

  console.log(mapCache)
}

export const onCharacterMove = ({ content, layers, mapCache }) => {
}