import type { Branch } from '~/types'

const branches: Branch[] = [
  {
    id: 1,
    name: 'Sucursal Centro',
    code: 'SUC-001',
    phone: '555-0101',
    manager: 'Carlos Pérez',
    status: 'active',
    location: 'Ciudad de México, MX'
  },
  {
    id: 2,
    name: 'Sucursal Norte',
    code: 'SUC-002',
    phone: '555-0102',
    manager: 'Ana Gómez',
    status: 'active',
    location: 'Monterrey, MX'
  },
  {
    id: 3,
    name: 'Sucursal Poniente',
    code: 'SUC-003',
    phone: '555-0103',
    manager: 'Luis Martínez',
    status: 'inactive',
    location: 'Guadalajara, MX'
  },
  {
    id: 4,
    name: 'Sucursal Sur',
    code: 'SUC-004',
    phone: '555-0104',
    manager: 'Sofía Rodríguez',
    status: 'active',
    location: 'Puebla, MX'
  },
  {
    id: 5,
    name: 'Sucursal Oriente',
    code: 'SUC-005',
    phone: '555-0105',
    manager: 'Jorge Hernández',
    status: 'active',
    location: 'Querétaro, MX'
  }
]

export default eventHandler(async () => {
  return branches
})
