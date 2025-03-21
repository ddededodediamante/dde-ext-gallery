(function (Scratch) {
  if (!Scratch.extensions.unsandboxed) {
    window.alert('The extension "Date Format" must be ran unsandboxed!');
    throw new Error('The extension "Date Format" must be ran unsandboxed!');
  }

  // Import package dayjs
  !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

  // Thanks sharkpool for original patch!
  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      const makeShape = (width, height) => {
        width -= 40;
        height -= 20;
        height /= 2;
        width = Math.max(width, 0);
        height =  Math.max(height, 0);
        return `m 20 0 q -10 0 -10 10 q -10 0 -10 ${height} q 0 ${height} 10 ${height} q 0 10 10 10 h ${width} q 10 0 10 -10 q 10 0 10 ${-height} q 0 ${-height} -10 ${-height} q 0 -10 -10 -10 z`;
      }

      const ogRender = SB.BlockSvg.prototype.render;
      SB.BlockSvg.prototype.render = function (...args) {
        const data = ogRender.call(this, ...args);

        if (this.svgPath_ && this.type.startsWith("ddeDateFormat_")) {
          if (
            this?.outputConnection?.check_?.length > 0 &&
            ['currentDate','createDate','addTime'].some(v => this.type.endsWith(v))
          ) {
            this.svgPath_.setAttribute("d", makeShape(this.width, this.height));
          }

          this.inputList.forEach((input, index) => {
            const block = input?.connection?.targetBlock();
            if (block && block.svgPath_) {
              if (block.type !== 'text') return;
              if (block?.parentBlock_.type === 'ddeDateFormat_createDate') return;
              if (block?.parentBlock_.type === 'ddeDateFormat_formatDate' && index !== 0) return;
              if (block?.parentBlock_.type === 'ddeDateFormat_addTime' && index !== 1) return;
              block.svgPath_.setAttribute("d", makeShape(block.width, block.height));
            }
          });
        }

        return data;
      };
    });
  
  // Made by ddededodediamante
  class DateFormatExtension {
    constructor() {
      this.timers = {};
      this.isValidDate = (date) => date?.$isDayjsObject === true;
    }

    getInfo() {
      return {
        id: "ddeDateFormat",
        name: "Date Format",
        color1: "#59c074",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Creation & Format",
          },
          {
            opcode: "currentDate",
            blockType: Scratch.BlockType.REPORTER,
            text: "current date"
          },
          {
            opcode: "createDate",
            blockType: Scratch.BlockType.REPORTER,
            text: "new date from [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2025-03-12",
                exemptFromNormalization: true
              }
            },
          },
          {
            opcode: "formatDate",
            blockType: Scratch.BlockType.REPORTER,
            text: "format date [date] as [format]",
            arguments: {
              date: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
              format: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "dddd, MMMM D, YYYY",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Comparations",
          },
          {
            opcode: "compareDate",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is date [date1] [operation] date [date2]?",
            arguments: {
              date1: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
              operation: {
                type: Scratch.ArgumentType.STRING,
                menu: "compareOperations",
              },
              date2: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
            },
          },
          {
            opcode: "isValid",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is date [date] valid?",
            arguments: {
              date: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Operators",
          },
          {
            opcode: "getDatePart",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [part] of [date]",
            arguments: {
              part: {
                type: Scratch.ArgumentType.STRING,
                menu: "dateParts",
              },
              date: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
            },
          },
          {
            opcode: "addTime",
            blockType: Scratch.BlockType.REPORTER,
            text: "add [amount] [unit] to [date]",
            arguments: {
              amount: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              unit: { type: Scratch.ArgumentType.STRING, menu: "timeUnits" },
              date: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
            },
          },
          {
            opcode: "diffDate",
            blockType: Scratch.BlockType.REPORTER,
            text: "difference between [date1] and [date2] in [unit]",
            arguments: {
              date1: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
              date2: {
                type: Scratch.ArgumentType.STRING,
                exemptFromNormalization: true
              },
              unit: { type: Scratch.ArgumentType.STRING, menu: "timeUnits" },
            },
          }
        ],
        menus: {
          compareOperations: {
            acceptReporters: true,
            items: [
              { text: "after", value: "after" },
              { text: "before", value: "before" },
              { text: "same as", value: "same" },
            ],
          },
          dateParts: {
            acceptReporters: false,
            items: [
              { text: "milliseconds", value: "millisecond" },
              { text: "seconds", value: "second" },
              { text: "minutes", value: "minute" },
              { text: "hours", value: "hour" },
              { text: "day (week)", value: "day" },
              { text: "day (month)", value: "daysInMonth" },
              { text: "month", value: "month" },
              { text: "year", value: "year" },
            ],
          },
          timeUnits: {
            acceptReporters: false,
            items: [
              "milliseconds",
              "seconds",
              "minutes",
              "hours",
              "days",
              "months",
              "years",
            ],
          },
        },
      };
    }

    currentDate() {
      return dayjs();
    }

    createDate({ string }) {
      return dayjs(string);
    }

    formatDate({ date, format }) {
      if (!this.isValidDate(date)) return "Invalid Date";
      if (!format || format === "") return "Invalid Format";
      return date.format(format);
    }

    compareDate({ date1, date2, operation }) {
      if (!this.isValidDate(date1) || !this.isValidDate(date2)) return "Invalid Date";
      if (operation === "after") return date1.isAfter(date2);
      else if (operation === "before") return date1.isBefore(date2);
      else if (operation === "same") return date1.isSame(date2);
      else return false;
    }

    isValid({ date }) {
      return this.isValidDate(date);
    }

    getDatePart({ date, part }) {
      if (!this.isValidDate(date)) return "Invalid Date";
      return date[part]();
    }

    addTime({ date, amount, unit }) {
      if (!this.isValidDate(date)) return "Invalid Date";
      return date.add(amount, unit);
    }

    diffDate({ date1, date2, unit }) {
      if (!this.isValidDate(date1) || !this.isValidDate(date2)) return "Invalid Date";
      return Math.abs(date1.diff(date2, unit));
    }
  }

  Scratch.extensions.register(new DateFormatExtension());
})(Scratch);
