import type { Branch } from '~/types'

const branches: Branch[] = [
  {
    id: 1,
    name: 'Sucursal Centro',
    code: 'SUC-001',
    phone: '555-0101',
    address: 'Ciudad de México, MX',
    manager: {
      id: 101,
      username: 'carlos.perez',
      name: 'Carlos Pérez'
    },
    is_active: true
  },
  {
    id: 2,
    name: 'Sucursal Norte',
    code: 'SUC-002',
    phone: '555-0102',
    address: 'Monterrey, MX',
    manager: {
      id: 102,
      username: 'ana.gomez',
      name: 'Ana Gómez'
    },
    is_active: true
  },
  {
    id: 3,
    name: 'Sucursal Poniente',
    code: 'SUC-003',
    phone: '555-0103',
    address: 'Guadalajara, MX',
    manager: {
      id: 103,
      username: 'luis.martinez',
      name: 'Luis Martínez'
    },
    is_active: false
  },
  {
    id: 4,
    name: 'Sucursal Sur',
    code: 'SUC-004',
    phone: '555-0104',
    address: 'Puebla, MX',
    manager: {
      id: 104,
      username: 'sofia.rodriguez',
      name: 'Sofía Rodríguez'
    },
    is_active: true
  },
  {
    id: 5,
    name: 'Sucursal Oriente',
    code: 'SUC-005',
    phone: '555-0105',
    address: 'Querétaro, MX',
    manager: {
      id: 105,
      username: 'jorge.hernandez',
      name: 'Jorge Hernández'
    },
    is_active: true
  }
]

export default eventHandler(async () => {
  return branches
})
