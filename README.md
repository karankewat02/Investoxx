# Investoxx : Invest with Confidence
Investoxx is a platform that helps users create and manage stock portfolios using AI to analyze market trends and stock news. Users can generate custom portfolios for informed investment decisions. Experience the future of portfolio management with Investoxx.

## Investoxx has 3 Platforms:
- Web App - [investoxx.tech](https://investoxx.tech)
- Mobile App
- Desktop App

---

## `Web App` - 
## Preqrequisites
- [Node.js](https://nodejs.org/en/)
- [python3](https://www.python.org/downloads/)
- [git](https://git-scm.com/downloads)
- [SSH key Linked to Github](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)


## Installation

1. Make a folder for the project and open git bash in that folder.
2. Clone the repository 
    - React JS Frontend
        ```bash
        git clone -b react git@github.com:karankewat02/Investoxx.git react
        ```
    - Django Backend
        ```bash
        git clone -b django git@github.com:karankewat02/Investoxx.git django
        ```
    - Node Backend
        ```bash
        git clone -b node git@github.com:karankewat02/Investoxx.git node
        ```

3. This will create a folder named `react` or `django` or `node` in the current directory.

4. Add the `.env` file in the `node` folder. The `.env` file contains the environment variables for the project. The `.env` file is not included in the repository for security reasons.

    - Visit [This Link](https://investoxx-assets.oss-ap-south-1.aliyuncs.com/.env) to download the `.env` file.
    - Copy the `.env` file in the `node` folder.


5. Install the dependencies for the project.

    - React JS Frontend, open git bash in the `react` folder and run the following command.
        ```bash
        npm install
        ```

    - Django Backend, open git bash in the `django` folder and run the following command.
        ```bash
        pip install -r requirements.txt
        ```

    - Node Backend, open git bash in the `node` folder and run the following command.
        ```bash
        npm install
        ```

6. Run the project.
    
    - Django Backend, open git bash in the `django` folder and run the following command.
        ```bash
        python manage.py runserver
        ```
    
    - Node Backend, open git bash in the `node` folder and run the following command.
        ```bash
        npm start
        ```
    - React JS Frontend, open git bash in the `react` folder and run the following command.
        ```bash
        npm start
        ```
    
    ```
    NOTE : The backend server should be running before the frontend server.
    ```

6. Open the browser and go to [`http://localhost:3000/`](http://localhost:3000/) to view the project.

### If you face any issues, please contact [Karan Kewat](mailto:karankewat2911@gmail.com) or [Juhi Nema](mailto:juhinema200@gmail.com).
