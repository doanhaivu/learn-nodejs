const Game = require ('./game');
const Constants = require ('../shared/constants');

jest.useFakeTimers();

describe('Game', () => {
    it('should update the game on interval', () => {
        const game = new Game();
        
        game.lastUpdateTime = Date.now() - 10;
        const initialCreatedTime = game.lastUpdateTime;
        
        jest.runOnlyPendingTimers();
        expect(game.lastUpdateTime).not.toEqual(initialCreatedTime);
    });
    
    it('should send updates on every second update', () => {
        const game = new Game();
        const socket = {
            id: '1234',
            emit: jest.fn(),
        };
        game.addPlayer(socket, 'guest');
        
        jest.runOnlyPendingTimers();
        expect(socket.emit).toHaveBeenCalledTimes(0);
        expect(game.shouldSendUpdate).toBe(true);
        
        jest.runOnlyPendingTimers();
        expect(socket.emit).toHaveBeenCalledTimes(1);
        expect(socket.emit).toHaveBeenCalledWith(Constants.MSG_TYPES.GAME_UPDATE, expect.any(Object));
        expect(game.shouldSendUpdate).toBe(false);
    });
    
    describe('handleInput ', () => {
        it('should update the direction of a player', () => {
           const game = new Game();
           const socket = {
               id: '1234',
               emit: jest.fn(),
           };
           game.addPlayer(socket, 'guest');
           
           game.handleInput(socket, 2);
           
           jest.runOnlyPendingTimers();
           jest.runOnlyPendingTimers();
           
           expect(socket.emit)
               .toHaveBeenCalledWith(
                   Constants.MSG_TYPES.GAME_UPDATE, 
                   expect.objectContaining({
                       me: expect.objectContaining({direction: 2}),
                   }),
               );
        });
    });
});