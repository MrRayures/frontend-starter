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

    if (_.startsWith(item.value, '$')){
      value = getRefference(item.value)
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
  return result
}

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

function removeCharacter(value, character) {
  return value.replace(character, '')
}


function checkNested(values, settings) {
  var output = []
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
  console.log(data);
  data = flatten((JSON.parse("{" +  RJSON.transform(data.replace(/\(/g,"{").replace(/\)/g,"}").replace(/\s/g,"")) + "}")));
  
  data = JSON.stringify(data).replace(/\$[a-z-]+[.]/g,"");
  
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

  fs.readFile(settings.dest, function (err, data) {
    var json = JSON.parse(data);
    var context = contents;
    json.context = context;
    
    fs.writeFile(settings.dest, JSON.stringify(json, null, 2), err => {
      if(err) throw err;
      //console.log(json);
      //console.log("Variables sass extraite : "+settings.dest);
    })
  })


  //const data = filetype.match(/\.y(a)?ml/g) ? yaml.dump(contents) : JSON.stringify(contents, null, 2)
  //console.log(data)
  //fs.writeFileSync(settings.dest, data);
}