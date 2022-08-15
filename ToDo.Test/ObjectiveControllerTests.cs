using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ToDo.BLL.Interfaces;
using ToDo.DAL.Entities;
using ToDoWebApi.Controllers;
using ToDoWebApi.DTOs;

namespace ToDo.Test;

public class ObjectiveControllerTests
{
    private Mock<IObjectiveService> _objectiveServiceMock;
    private Mock<IMapper> _mapperMock;
    private ObjectivesController _controller;

    [SetUp]
    public void Setup()
    {
        _objectiveServiceMock = new Mock<IObjectiveService>();
        _mapperMock = new Mock<IMapper>();
        _controller = new ObjectivesController(_objectiveServiceMock.Object, _mapperMock.Object);

    }


    [Test]
    public async Task GetObjectives_ReturnsOk()
    {
        //Arrange
        _objectiveServiceMock.Setup(x => x.GetAllObjectivesAsync())
            .ReturnsAsync(new List<Objective> { new Objective(), new Objective()});

        //Act
        ActionResult result = await _controller.GetObjectives();

        //Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOf<OkObjectResult>(result);
    }

    [Test]
    public async Task GetObjectiveById_ReturnsNeededId()
    {
        //Arrange
        _objectiveServiceMock.Setup(x => x.GetObjectiveByIdAsync(5))
            .ReturnsAsync(new Objective { Id = 5 });
        _mapperMock.Setup(m => m.Map<ObjectiveDTO>(It.IsAny<Objective>()))
            .Returns(new ObjectiveDTO() { Id = 5 });

        //Act
        ActionResult result = await _controller.GetObjective(5);
        var content = (result as OkObjectResult).Value;

        //Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOf<OkObjectResult>(result);
        Assert.AreEqual(5, (content as ObjectiveDTO).Id);
    }

    [Test]
    public async Task GetObjective_ReturnsNotFound()
    {
        //Arrange
        _objectiveServiceMock.Setup(x => x.GetObjectiveByIdAsync(5))
            .ReturnsAsync(new Objective { Id = 5 });

        //Act
        ActionResult result = await _controller.GetObjective(12);

        //Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOf<NotFoundResult>(result);
    }

    [Test]
    public async Task DeleteObjective_ReturnsOK()
    {
        //Act
        ActionResult result = await _controller.DeleteObjectiveById(12);

        //Assert
        Assert.IsInstanceOf<OkResult>(result);
    }


    [Test]
    public async Task CreateObjective_ReturnsÑreatedAt()
    {
        //Arrange
        ObjectiveDTO newObjectiveDTO = new ObjectiveDTO();  
        _objectiveServiceMock.Setup(x => x.CreateObjective(It.IsAny<Objective>()));
        _mapperMock.Setup(m => m.Map<Objective>(It.IsAny<ObjectiveDTO>()))
            .Returns(new Objective());

        //Act
        ActionResult result = await _controller.PostObjective(newObjectiveDTO);
        var resultValue = (result as ObjectResult).Value;

        //Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOf<CreatedAtActionResult>(result);
        Assert.IsNotNull(resultValue);
        Assert.IsInstanceOf<Objective>(resultValue);
    }


    [Test]
    public async Task CreateObjective_ReturnsBadRequest()
    {
        //Arrange
        ObjectiveDTO newObjectiveDTO = new ObjectiveDTO();
        _objectiveServiceMock.Setup(x => x.CreateObjective(It.IsAny<Objective>()));
        _mapperMock.Setup(m => m.Map<Objective>(It.IsAny<ObjectiveDTO>()))
            .Returns(new Objective());
        _controller.ModelState.AddModelError("", "");

        //Act
        ActionResult result = await _controller.PostObjective(newObjectiveDTO);

        //Assert
        Assert.IsInstanceOf<BadRequestObjectResult>(result);
    }
     

    [Test]
    public async Task PutObjective_ReturnsNoContent()
    {
        //Arrange
        ObjectiveDTO newObjectiveDTO = new ObjectiveDTO();
        _objectiveServiceMock.Setup(x => x.UpdateObjective(It.IsAny<Objective>()));
        _objectiveServiceMock.Setup(x => x.GetObjectiveByIdAsync(5))
            .ReturnsAsync(new Objective { Id = 5 });
        _mapperMock.Setup(m => m.Map(It.IsAny<ObjectiveDTO>(), It.IsAny<Objective>()))
            .Returns(new Objective());

        //Act
        int id = 5;
        ActionResult result = await _controller.PutObjectiveById(id, newObjectiveDTO);

        //Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOf<NoContentResult>(result);
    }

    [Test]
    public async Task PutObjective_ReturnsNotFound()
    {
        //Arrange
        ObjectiveDTO newObjectiveDTO = null;
        _objectiveServiceMock.Setup(x => x.UpdateObjective(It.IsAny<Objective>()));
        _mapperMock.Setup(m => m.Map(It.IsAny<ObjectiveDTO>(), It.IsAny<Objective>()))
            .Returns(new Objective());

        //Act
        int id = 45;
        ActionResult result = await _controller.PutObjectiveById(id, newObjectiveDTO);

        //Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOf<NotFoundObjectResult>(result);
    }

}
