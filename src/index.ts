/**
 * @module stackexchange
 */

import stackexchange from 'stackexchange';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

let MOD_ID = "stackexchange"
let stack = new stackexchange({ version: 2.2 });

export interface StackExchangeContext {
  key?: string;
  pagesize?: number;
  tagged?: string;
  sort?: string;
  order?: string;
}

@RpsModule(MOD_ID)
export default class RPSStackexchange {
  constructor(ctx:RpsContext){
    let mapContext = ctx.getModuleContext(MOD_ID);
    
    if(!mapContext)
      ctx.event.emit(RpsContext.LOAD_MOD_ERR_EVT,MOD_ID,new Error("No config found for stackexchange module"));
  }

  @rpsAction({verbName:'get-stack-questions'})
  async getQuestions (ctx:RpsContext,opts:Object) : Promise<any>{
    
    let filter = this.parseOptions(ctx,opts);

    return new Promise((resolve,reject)=> {
      stack.questions.questions(filter, function (err,result) {
        if(err)reject(err);
        else resolve(result);
      });
    });
    
  }

  private parseOptions(ctx:RpsContext,opts:Object) : StackExchangeContext {
    return {
      key:ctx.getModuleContext(MOD_ID).key,
      pagesize: opts['pagesize'] || 50,
      tagged: opts['tagged'] || '',
      sort: opts['sort'] || 'activity',
      order: opts['order'] || 'asc'
    }
  }

}

