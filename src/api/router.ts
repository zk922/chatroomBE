import {IoRouter} from "../models/IoRouter";


export const router = new IoRouter();

router.use('/public/:id/:name', function (packet, next) {
  console.log(packet.data);
  console.log(packet.path);
  console.log(packet.packet[0]);
  console.log(packet.socket.handshake)
});

export default router;