import React, { FC, useMemo } from 'react'

import { Figure, FigureNames } from '../../models/figures/Figure'

import styles from './styles.module.css'

interface IProps {
  title: string;
  figures: Figure[]
}

type MapFigures = Record<FigureNames, Figure[]>

export const LostFigures: FC<IProps> = ({ title, figures }) => {
  const mapFigures = useMemo(() => figures.reduce<MapFigures>((acc, figure) => {
    return {
      ...acc,
      [figure.name]: acc[figure.name] ? [ ...acc[figure.name], figure] : [figure],
    }
  }, {} as MapFigures), [figures])

  return (
    <div className={styles.figures}>
      <h2>{title}</h2>
      {Object.keys(mapFigures).map((key) => {
        const countFigures = mapFigures[key as FigureNames].length
        const name = mapFigures[key as FigureNames][0].name
        const logo = mapFigures[key as FigureNames][0].logo
        const color = mapFigures[key as FigureNames][0].color

        return (
          <div key={key} className={styles.figure}>
            <span>{name} x {countFigures}</span>
            <img width={20} height={20} src={logo || ''} alt={`${color}-${name}`} />
          </div>
        )
      })}
    </div>
  )
}
