import { useEffect } from 'react'
import { usePrevious } from 'react-use'

import {
  boolRandom,
  randomObstacleType,
  randomObstacleEffect,
} from '../../component/Game/utils'
import { UPDATE_INTERVAL_TIME } from '../../component/Game/const'

import { useGameContext } from '../../context/gameContext'
import { ObstacleType, ObstacleEffectType } from '../../types/obstacle.model'

export const OBSTACLE_BASE_SPEED = 1
export const OBSTACLE_RESET_POSITION = -90
export const OBSTACLE_BASE_X_POSITION = 160
export const OBSTACLE_BASE_Y_POSITION = 340

export const OBSTACLE_SWAP_NEW_POSITION = 480
export const OBSTACLE_REVERSE_NEW_POSITION = 480

export const OBSTACLE_BASE_START_POSITION = 30
export const OBSTACLE_BASE_START_POSITION_OFFSET = 120

const ObstacleStyles: Record<ObstacleEffectType, string> = {
  '0': 'black',
  '1': 'blue',
  '2': 'pink',
  '3': 'limegreen',
}

export const isReverseObstacle = (
  positionX: number,
  currentEffect: ObstacleEffectType
) => {
  return currentEffect === ObstacleEffectType.reverse && positionX <= 270
}

export const isSwapObstacle = (
  positionX: number,
  currentEffect: ObstacleEffectType
) => {
  return currentEffect === ObstacleEffectType.swap && positionX <= 270
}

const useObstacle = () => {
  const [{ obstacle, canvas, game }, { setObstacle, setGame }] =
    useGameContext()

  const prevObstacle = usePrevious(obstacle)

  const resetObstacle = () => {
    const type = randomObstacleType()
    const effect = randomObstacleEffect()
    const speed = boolRandom() ? OBSTACLE_BASE_SPEED * 2 : OBSTACLE_BASE_SPEED

    setGame(({ score }) => ({ score: score + 1 }))
    setObstacle((prev) => ({
      type,
      speed,
      effect,
      position: {
        ...prev.position,
        x:
          600 +
          (boolRandom()
            ? OBSTACLE_BASE_START_POSITION + OBSTACLE_BASE_START_POSITION_OFFSET
            : OBSTACLE_BASE_START_POSITION),
      },
    }))
  }

  const drawObstacle = () => {
    const baseY =
      obstacle.type === ObstacleType.plain
        ? OBSTACLE_BASE_Y_POSITION
        : OBSTACLE_BASE_X_POSITION

    canvas!.lineWidth = 0
    canvas!.fillStyle = ObstacleStyles[obstacle.effect]

    if (obstacle.effect === ObstacleEffectType.bordered) {
      canvas!.lineWidth = 0.05
      canvas?.clearRect(prevObstacle?.position.x ?? 540, baseY, 30, 60)
      canvas?.strokeRect(obstacle.position.x ?? 540, baseY + 1, 29, 58)
      return
    }

    canvas?.clearRect(prevObstacle?.position.x ?? 540, baseY, 30, 60)
    canvas?.fillRect(obstacle.position.x ?? 540, baseY, 30, 60)
  }

  const checkObstacleEffect = (
    positionX: number,
    currentEffect: ObstacleEffectType
  ) => {
    switch (true) {
      case isReverseObstacle(positionX, currentEffect):
        onReverseObstacle()
        break
      case isSwapObstacle(positionX, currentEffect):
        onSwapObstacle()
        break
    }
  }

  const onReverseObstacle = () => {
    setObstacle(({ position }) => ({
      effect: randomObstacleEffect(),
      position: { ...position, x: OBSTACLE_REVERSE_NEW_POSITION },
    }))
  }

  const onSwapObstacle = () => {
    setTimeout(() => {
      canvas?.clearRect(160, 0, 400, 400)
    }, 0)

    setObstacle(({ type, position }) => ({
      effect: randomObstacleEffect(),
      position: { ...position, x: OBSTACLE_SWAP_NEW_POSITION },
      type: type === ObstacleType.plain ? ObstacleType.fly : ObstacleType.plain,
    }))
  }

  useEffect(() => {
    if (game.state === 'pause') return

    const updateObstacle = () => {
      setObstacle((prev) => ({
        position: { ...prev.position, x: prev.position.x - prev.speed },
      }))
    }

    const updateObstacleInterVal = setInterval(
      updateObstacle,
      UPDATE_INTERVAL_TIME
    )

    return () => clearInterval(updateObstacleInterVal)
  }, [game.state])

  /// check special obstacle effect.
  useEffect(() => {
    checkObstacleEffect(obstacle?.position?.x, obstacle?.effect)
  }, [obstacle.effect, obstacle.position])

  /// check obstacle position.
  useEffect(() => {
    if (!canvas) return

    if (obstacle.position.x <= OBSTACLE_RESET_POSITION) {
      resetObstacle()
    }

    drawObstacle()
  }, [canvas, obstacle.position])
}

export default useObstacle
