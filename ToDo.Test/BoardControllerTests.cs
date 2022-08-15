using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ToDo.BLL.Interfaces;
using ToDo.DAL.Entities;
using ToDoWebApi.Controllers;
using ToDoWebApi.DTOs;

namespace ToDo.Test
{
    public class BoardControllerTests
    {
        private Mock<IBoardsService> _boardServiceMock;
        private Mock<IMapper> _mapperMock;
        private BoardsController _controller;

        [SetUp]
        public void Setup()
        {
            _boardServiceMock = new Mock<IBoardsService>();
            _mapperMock = new Mock<IMapper>();
            _controller = new BoardsController(_boardServiceMock.Object, _mapperMock.Object);
        }


        [Test]
        public async Task GetBoards_ReturnsOk()
        {
            //Arrange
            _boardServiceMock.Setup(x => x.GetAllBoardsAsync())
                .ReturnsAsync(new List<Board> { new Board(), new Board() });

            //Act
            ActionResult result = await _controller.GetBoards();

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetBoards_ReturnsNotFound()
        {
            //Arrange
            _boardServiceMock.Setup(x => x.GetBoardByIdAsync(5))
                .ReturnsAsync(new Board { Id = 5 });

            //Act
            ActionResult result = await _controller.GetBoard(12);

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task GetBoardById_ReturnsNeededId()
        {
            //Arrange
            _boardServiceMock.Setup(x => x.GetBoardByIdAsync(5))
                .ReturnsAsync(new Board { Id = 5 });
            _mapperMock.Setup(m => m.Map<BoardDTO>(It.IsAny<Board>()))
                .Returns(new BoardDTO() { Id = 5 });

            //Act
            ActionResult result = await _controller.GetBoard(5);
            var content = (result as OkObjectResult).Value;

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result);
            Assert.AreEqual(5, (content as BoardDTO).Id);
        }


        [Test]
        public async Task DeleteBoard_ReturnsOK()
        {
            //Act
            ActionResult result = await _controller.DeleteBoardById(12);

            //Assert
            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public async Task CreateBoard_ReturnsСreatedAt()
        {
            //Arrange
            BoardDTO newBoardDTO = new BoardDTO();
            _boardServiceMock.Setup(x => x.CreateBoard(It.IsAny<Board>()));
            _mapperMock.Setup(m => m.Map<Board>(It.IsAny<BoardDTO>()))
                .Returns(new Board());

            //Act
            ActionResult result = await _controller.PostBoard(newBoardDTO);
            var resultValue = (result as ObjectResult).Value;

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<CreatedAtActionResult>(result);
            Assert.IsNotNull(resultValue);
            Assert.IsInstanceOf<Board>(resultValue);
        }

        [Test]
        public async Task CreateBoard_ReturnsBadRequest()
        {
            //Arrange
            BoardDTO newBoardDTO = new BoardDTO();
            _boardServiceMock.Setup(x => x.CreateBoard(It.IsAny<Board>()));
            _mapperMock.Setup(m => m.Map<Board>(It.IsAny<BoardDTO>()))
                .Returns(new Board());
            _controller.ModelState.AddModelError("", "");

            //Act
            ActionResult result = await _controller.PostBoard(newBoardDTO);

            //Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }



        [Test]
        public async Task PutBoard_ReturnsNoContent()
        {
            //Arrange
            BoardDTO newBoardDTO = new BoardDTO();
            _boardServiceMock.Setup(x => x.UpdateBoard(It.IsAny<Board>()));
            _boardServiceMock.Setup(x => x.GetBoardByIdAsync(5))
                .ReturnsAsync(new Board { Id = 5 });
            _mapperMock.Setup(m => m.Map(It.IsAny<BoardDTO>(), It.IsAny<Board>()))
                .Returns(new Board());

            //Act
            int id = 5;
            ActionResult result = await _controller.PutObjectiveById(id, newBoardDTO);

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task PutBoard_ReturnsNotFound()
        {
            //Arrange
            BoardDTO newBoardDTO = null;
            _boardServiceMock.Setup(x => x.UpdateBoard(It.IsAny<Board>()));
            _mapperMock.Setup(m => m.Map(It.IsAny<ObjectiveDTO>(), It.IsAny<Objective>()))
                .Returns(new Objective());

            //Act
            int id = 45;
            ActionResult result = await _controller.PutObjectiveById(id, newBoardDTO);

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }


        [Test]
        public void GetAllBoardObjectivesById_ReturnsOk()
        {
            //Arrange
            _boardServiceMock.Setup(x => x.GetAllBoardObjectives(5))
                .Returns(new List<Objective> { new Objective(), new Objective() }); 

            //Act
            ActionResult result = _controller.GetAllBoardObjectivesById(5);

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public void GetAllBoardsWithObjectives_ReturnsOk()
        {
            //Arrange
            _boardServiceMock.Setup(x => x.GetBoardsWithObjectives())
                .Returns(new List<Board> { new Board(), new Board() });

            //Act
            ActionResult result = _controller.GetAllBoardsWithObjectives();

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }
    }
}
