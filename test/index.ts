import {expect} from 'chai';
import m from 'mocha';

import RPSStackexchange from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('StackExchange', () => {

  m.it('should get node.js questions', async function () {
    let ctx = new RpsContext
    ctx.addModuleContext('stackexchange',{key:'API_KEY'})
    let md = new RPSStackexchange(ctx);

    let output = await md.getQuestions(ctx,{tagged:'node.js'});

    console.log(output);

  }).timeout(0);

})
