import { expectType } from 'tsd';
import ip, { isV4Format } from '.';

expectType<string>(ip.address());
expectType<boolean>(isV4Format('127.0.0.1'));
