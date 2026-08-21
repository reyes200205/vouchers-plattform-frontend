import { k as eventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';

const branches = [
  {
    id: 1,
    name: "Sucursal Centro",
    code: "SUC-001",
    phone: "555-0101",
    address: "Ciudad de M\xE9xico, MX",
    manager: {
      id: 101,
      username: "carlos.perez",
      name: "Carlos P\xE9rez"
    },
    is_active: true
  },
  {
    id: 2,
    name: "Sucursal Norte",
    code: "SUC-002",
    phone: "555-0102",
    address: "Monterrey, MX",
    manager: {
      id: 102,
      username: "ana.gomez",
      name: "Ana G\xF3mez"
    },
    is_active: true
  },
  {
    id: 3,
    name: "Sucursal Poniente",
    code: "SUC-003",
    phone: "555-0103",
    address: "Guadalajara, MX",
    manager: {
      id: 103,
      username: "luis.martinez",
      name: "Luis Mart\xEDnez"
    },
    is_active: false
  },
  {
    id: 4,
    name: "Sucursal Sur",
    code: "SUC-004",
    phone: "555-0104",
    address: "Puebla, MX",
    manager: {
      id: 104,
      username: "sofia.rodriguez",
      name: "Sof\xEDa Rodr\xEDguez"
    },
    is_active: true
  },
  {
    id: 5,
    name: "Sucursal Oriente",
    code: "SUC-005",
    phone: "555-0105",
    address: "Quer\xE9taro, MX",
    manager: {
      id: 105,
      username: "jorge.hernandez",
      name: "Jorge Hern\xE1ndez"
    },
    is_active: true
  }
];
const branches_default = eventHandler(async () => {
  return branches;
});

export { branches_default as default };
//# sourceMappingURL=branches.mjs.map
