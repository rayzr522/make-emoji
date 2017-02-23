const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function usage() {
    console.log('Usage: make-emoji <input> <slices> <output>');
}

exports.main = function (args) {

    if (args.length < 3 || !fs.existsSync(args[0])) {
        usage();
        process.exit(1);
    }

    var image = sharp(args[0]);

    image.metadata().then(meta => {

        if (meta.width != meta.height) {
            console.error('The image must be square!');
            process.exit(1);
        }

        if (isNaN(args[1])) {
            console.error(`'${args[1]}' is an invalid number of slices!`);
            process.exit(1);
        }

        var slices = parseInt(args[1]);

        var sliceSize = meta.width / slices;

        var folder = `emoji-output-${Date.now()}`;
        fs.mkdirSync(folder);

        for (var y = 0; y < slices; y++) {
            for (var x = 0; x < slices; x++) {
                sharp(args[0])
                    .extract({ left: x * sliceSize, top: y * sliceSize, width: sliceSize, height: sliceSize })
                    .png().toFile(path.resolve(folder, `${args[2]}${x + y * slices}.png`));
            }
        }

    }).catch(err => {
        console.error(`Failed to convert! ${err}`);
    });
}