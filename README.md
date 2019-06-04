# LiwiDesktop

A desktop interface to enable users to test [LIWI](https://github.com/Shaalan31/LIWI)

This application enables users to identify the writer of a handwritten paper from a pool of 300 writers.

## Screen shots
---
![LOGO][logo] 

*LI Writer Identification*

![Homepage][home] 

*Landing page*

![Add Writer][add_writer] 

*Add writer*

![Add  Sample][add_sample] 

*Add Sample*

![Sample done][sample_done] 

*Sample added*

![Identify][identify] 

*Select Language to identify between different writers*

![predict][predict] 

*Select a paper to identify it's wirter's identity*

![prediction][prediction] 

*Prediction Result*




## Requirements

For development, you will only need Node.js and a node global package installed in your environement, and MongoDB to store the features of the writers, and a the python server of [LIWI](https://github.com/Shaalan31/LIWI).

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g



### LIWI

Follow the steps in LIWI's repo

## Install

    $ git clone https://github.com/Shaalan31/LiwiDesktop
    $ cd LiwiDesktop

	## Running the project
	
	$ npm install 
	$ npm start





[logo]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/logo.png "LI Writer Indeitification"

[add_sample]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/add_sample.png "Add Sample"

[add_writer]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/add_writer.png "Add Writer"

[home]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/home.png "Home"

[identify]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/identify.png "Identify"

[predict]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/predict.png "predict"

[prediction]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/prediction.png "prediction"

[sample_done]: https://github.com/Shaalan31/LiwiDesktop/blob/master/readme_images/sample_done.png "sample done"


