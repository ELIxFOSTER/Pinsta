## Pinsta

Pinsta is a social media platform that allows users to discover and save ideas for various projects or interests by pinning them to virtual pinboards. It's often used for inspiration, planning, and bookmarking, with content ranging from recipes and fashion to home decor and travel. Here is the live link <a href="https://pinsta-project.onrender.com">Pinsta</a> 🖼️

## Wiki
- [Feature List](https://github.com/ELIxFOSTER/Pinsta/wiki/Feature-List)
- [User Stories](https://github.com/ELIxFOSTER/Pinsta/wiki/User-Story)
- [Database Schema](https://dbdiagram.io/d/640abdd5296d97641d86deb9)

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-%23404d59.svg?style=for-the-badge&logo=flask&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**Database:**

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Hosting:**

![Render](https://img.shields.io/badge/Render-informational?style=for-the-badge&logo=render&logoColor=%5bdec3)

## Run Locally
### HTTPS
```bash
  git clone https://github.com/ELIxFOSTER/Pinsta.git
```

### SSH
```bash
  git clone git@github.com/ELIxFOSTER/Pinsta.git
```

Install dependencies

```bash
pip install -r requirements.txt &&
flask db upgrade &&
flask seed all
```

```bash
cd react-app
npm install --prefix react-app 
```

Start the server

```bash
pipenv run flask run
```

In seperate terminal

```bash
cd react-app
npm start
```

## Landing Page
PINSTA

![Screenshot 2023-04-13 132748](https://user-images.githubusercontent.com/107530902/231837982-f07e041e-00b6-4653-b1b9-89295fb422f3.png)

### Cloned Site
PINTEREST
![Screenshot 2023-03-19 231413](https://user-images.githubusercontent.com/107530902/226262446-14b545d8-bb77-4182-ad1b-8feba4d4498d.png)

### Technical Challenges

Removing a single pin from a board. I passed both the boardId and pinId, looped through all of the boards pins, found the matching id, then popped the pin off the board so that it was just removed not deleted

```bash
  def remove_pin(id):


    res = request.get_json()
    pinId = int(res['pinId'])

    data = Board.query.get(id)
    for idx, x in enumerate(data.board_pins):
        if x.id == pinId:
            index = idx


    data.board_pins.pop(index)
    db.session.add(data)
    db.session.commit()

```
