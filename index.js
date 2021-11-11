const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio');


function processArgs(args){

  if (args.length < 3 ){
    console.error("Invalid arguments: Must provide config file")
  }
  const configPath = process.argv[2]
  return configPath
}


function mergeFiles({files, output_filename}){
  console.log('files: ', files)
  let finalText = "";

  for (let f of files){
    finalText += "\n\n<!-- ***************************************  START " + f + "   ****************************************** -->\n\n"
    try{
      finalText += fs.readFileSync(f,'utf8');
    }
    catch(error){
      console.error("\x1b[31m", "ERROR Reading files:\n", error.message);
      return
    }
  }
  try {
    const data = fs.writeFileSync(output_filename, finalText)
    //file written successfully
  } catch (err) {
    console.error("\x1b[31m", err)
  }
}

function urlRaplacer(urlMappings, $){
  for (let i of urlMappings){
    const { id, src } = i;
    const $el = $('#'+ id.toString());
    console.log('before type')
    const elType = $($el).prev().prop('nodeName');
    console.log('el type: ', elType, typeof elType)

    let attr;

    switch (elType){
      case 'SCRIPT': 
        attr = 'src';
        console.log('is script')
        break;
      
      case 'STYLE': 
        attr = 'href'
        break;
      
      default: 
        break;
      
    }
    if (attr){
      console.log('attr: ', attr)
      $el.attr(attr, src)
    }
  }
}

function formatHtml( config){
  const parsedConfig = JSON.parse(fs.readFileSync(config, 'utf8'));
  const { html_source, url_mapping, output } = parsedConfig
  const htmlString = fs.readFileSync(html_source, 'utf8');

  // * create jquery type object of the whole fake dom
  const $ = cheerio.load(htmlString);

  // * swap in production urls
  urlRaplacer(url_mapping, $)

  // * render the html
  const renderedHtml = $('body').html()

  // * write rendered html to file specified in config
  fs.writeFileSync(output, renderedHtml.trim())

}

const args = processArgs(process.argv)

const outputHTML = formatHtml(args)

