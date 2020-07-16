from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
import pickle

X, y=make_regression(n_samples=20, n_features=10, noise=4, bias=100)
# print(X)

lr=LinearRegression()
lr.fit(X, y)
# print(lr.coef_)
# print(lr.score(X, y))

# test_x=X[-1, :]
test_x=X[-1][:]
# test_x=[-0.37366486, -0.36414149,  0.07775479, -0.39379768,  0.43433576, -0.54422848, 0.25784175, -0.06690142, 1.15140288, 0.70230892]
# test_y=-22.89860209
test_y=y[-1]
# print(X)
print(test_x)
print(lr.predict([test_x]))
print(test_y)

pickle.dump(lr, open('lr_model.sav', 'wb'))