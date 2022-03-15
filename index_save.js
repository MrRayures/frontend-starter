var
  _ = require('lodash'),
  fs = require('fs'),
  chalk = require('chalk'),
  tinycolor = require("tinycolor2"),
  log = require('fancy-log'),
  RJSON = require('relaxed-json'),
  flatten = require('flat'),
  yaml = require('js-yaml');

function defaultMode(settings) {
  getValues(settings);
}

function colorMode(settings) {
  settings['mode'] = 'colors';
  getValues(settings);
};

module.exports = defaultMode;
module.exports.color = colorMode;

var allValues;
function getValues(settings, done) {
  var values = readScss(settings);

  values = checkNested(values, settings);

  allValues = values;
  var result = processVariables(settings.mode , values, settings);
  toYaml(settings, result);
}

function processVariables(mode, values, settings) {
  result = [];
  values.forEach(function(item) {
    var value = item.value;

    if (mode === 'colors') {
      value = processColor(item.value);
      if (item.value.includes('tint(') || item.value.includes('shade(') || item.value.includes('lighten(') || item.value.includes('darken(')) {
        value = processTintShade(item.value);
      } else if ((item.value).includes('$')){
        value = getRefference(item.value)
      }
    } else if (_.startsWith(item.value, '$')){
      value = getRefference(item.value)
      //console.log(value);
    }
    if (value !== ''){
      result.push({
        name: item.name,
        value: value
      });
      
    }
  });
  
  return result;
  
}

function getRefference(value) {
  var result = '';
  try {
    result = ((_.find(allValues, { 'name':  value})).value);
  } catch(err) {
    log.error(chalk.yellow('Could not find: ' + value))
  }
  console.log(result);
  return result
}

/*
function mix(color_1, color_2, weight) {
  function d2h(d) {
    return d.toString(16);
  }
  function h2d(h) {
    return parseInt(h, 16);
  }
  weight = (typeof(weight) !== 'undefined') ? weight : 50;
  var color = "#";
  for (var i = 0; i <= 5; i += 2) {
    var v1 = h2d(color_1.substr(i, 2)),
      v2 = h2d(color_2.substr(i, 2)),
      val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
    while (val.length < 2) {
      val = '0' + val;
    }
    color += val;
  }
  return color;
};

function colorTintShade(mode, color, value) {
  color = removeCharacter(color, '#');

  var modeColor = 'ffffff';
  if (mode !== 'tint'){
    modeColor = '000000';
  }
  var mixed = mix((color), (modeColor), value);
  return mixed
}
*/

function readScss(settings) {
  var data = _.filter(fs.readFileSync(settings.src, 'utf8').split('\n'), item => _.startsWith(item, '$'));
  return _.map(data, (item) => {
    const x = item.split(':');
    return {
      name: x[0].trim(),
      value: x[1].replace(/;.*/, '').trim()
    };
  });
}

function processColor(value) {
  var color = ((value).replace(/(tint\(|shade\(|lighten\(|darken\()/, ""));
  if(color.includes(',')){
    color = color.substring(0, color.indexOf(','));
  }
  return color
}

function removeCharacter(value, character) {
  return value.replace(character, '')
}

function processTintShade(colorValue) {
  var value =  (colorValue.split(',').pop()).match(/\d+/)[0];
  var result;
  var color = processColor(colorValue);
  if (colorValue.includes('$')) {
    var variable = (colorValue).substring((colorValue).lastIndexOf("$"),(colorValue).lastIndexOf(","));
    color = getRefference(variable);
    if (color === ''){
      return color
    }
  }
  if (colorValue.includes('tint(')) {
    result = colorTintShade('tint', color, value);
  } else if (colorValue.includes('shade(')) {
    result = colorTintShade('shade', color, value);
  } else if (colorValue.includes('lighten(')) {
    result = tinycolor(color).lighten(value).toString();
  } else if (colorValue.includes('darken(')) {
    result = tinycolor(color).darken(value).toString();
  }
  return result
}

function checkNested(values, settings) {
  var output = [];
  values.forEach(function(item) { 
    if (item.value === '(') {
      output = _.concat(output, nestedProperties(item.name, settings));
    } else {
      output.push(item)
    }

  });
  return output;
}

function nestedProperties(value, settings) {
  var data = (fs.readFileSync(settings.src, 'utf8')).replace(/\r?\n|\r/g, "");
  data = data.substr(data.indexOf(value), data.length);
  data = data.substr(0, data.indexOf(';'));
  data = flatten((JSON.parse("{" +  RJSON.transform(data.replace(/\(/g,"{").replace(/\)/g,"}").replace(/\s/g,"")) + "}")));
  data = JSON.stringify(data).replace(/\$[a-z-]+[.]/g,"");
  console.log(data);
  data =  flatten(JSON.parse(data)); //convert back to array

  

  var output = [];
  for (item in data) {
    output.push({
      name: item,
      value: data[item]
    });
  }
  return output
}


function toYaml(settings, values) {
  let key = settings.type !== 'fractal' ? 'items' : 'context';
  let contents;
  if ( settings.type !== 'fractal') {
    contents = {
      "items": values,
      "description": settings.description
    };
  } else {
    contents = {
      "context": {
        "items": values,
        "description": settings.description
      }
    };
  }

  const filetype = settings.dest.substr(settings.dest.lastIndexOf('.'), settings.dest.length);

  /*fs.readFile(settings.dest, function (err, data) {
    var json = JSON.parse(data);
    var context = contents;
    json.context = context;
    
    fs.writeFile(settings.dest, JSON.stringify(json, null, 2), err => {
      if(err) throw err;
      console.log(json);
      console.log("Variables sass extraite : "+settings.dest);
    })
  })*/


  //const data = filetype.match(/\.y(a)?ml/g) ? yaml.dump(contents) : JSON.stringify(contents, null, 2)
  //console.log(data)
  //fs.writeFileSync(settings.dest, data);
}